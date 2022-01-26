import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'; 
import * as Yup from 'yup';
import { SpaceXLaunches } from './components/SpaceXLaunches'


const searchSchema = Yup.object({

  spaceXSearch: Yup.string()
    .min(3, 'Must be at least 3 characters long')
    .required('Required')
});

type searchValues = Yup.InferType<typeof searchSchema>

function App() {
  const [rocketName, setRocketName] = useState<string>('');

  const AutoSubmitSpaceXSearch = () => {
    const { values, submitForm } = useFormikContext<searchValues>();
    useEffect(() => {
  
      if (values.spaceXSearch.length >= 3) {
        submitForm();
      }
    }, [values, submitForm]);

    return null;
  };

  return (
    <div className='bg-orange-400 min-h-screen'>
      <Formik
        initialValues={{ spaceXSearch: '' }}
        validationSchema={ searchSchema }
        onSubmit={ async ({ spaceXSearch }, { setSubmitting }) => {

          setRocketName(spaceXSearch)
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
        }) => (
          <Form className='mx-auto w-max h-80 flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <label className='text-5xl p-3 font-mono' htmlFor="spaceXSearch"> Search: </label>
            <Field className="bg-stone-800 h-10 border-2 rounded text-white p-5" type="text" id="spaceXSearch" name="spaceXSearch" />
            <ErrorMessage name="spaceXSearch" component="div" />
          
            <AutoSubmitSpaceXSearch />
          </Form>
        )}
     </Formik>

     { rocketName && <SpaceXLaunches rocketName={ rocketName } /> }
    </div>
  );
}

export default App;
