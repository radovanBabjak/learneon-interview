import { useState, useEffect, ReactElement } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'; 
import * as Yup from 'yup';
import { SpaceXLaunches } from './components/SpaceXLaunches'
import { searchValues } from './types/types';
import { searchSchema } from './types/schemas';


function App(): ReactElement {
  const [rocketName, setRocketName] = useState<string>('');

  const AutoSubmitSpaceXSearch = (): null => {
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

        onSubmit={ ({ spaceXSearch }, { setSubmitting }) => {
          setRocketName(spaceXSearch)
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
        }) => (
          <Form className='mx-auto w-max h-80 flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <label className='text-5xl p-3 font-serif' htmlFor="spaceXSearch"> Enter rocket name: </label>
            <Field className="bg-stone-800 h-10 border-2 rounded text-white p-5" type="text" id="spaceXSearch" name="spaceXSearch" />
            <ErrorMessage name="spaceXSearch" component="div" />
          
            <AutoSubmitSpaceXSearch />
          </Form>
        )}
     </Formik>

     { rocketName && <SpaceXLaunches spaceXSearch={ rocketName } /> }
    </div>
  );
}

export default App;
