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
  const [spaceXSearchTerm, setSpaceXSearchTerm] = useState<string>('');

  const AutoSubmit = () => {

    const { values, submitForm } = useFormikContext<searchValues>();
    useEffect(() => {
  
        if (values.spaceXSearch.length >= 3) {
            submitForm();
        }
    }, [values, submitForm]);
    return null;
  };

  return (
    <div>
      <Formik
        initialValues={{ spaceXSearch: '' }}

        validationSchema={ searchSchema }

        onSubmit={ async ({ spaceXSearch }, { setSubmitting }) => {

          setSpaceXSearchTerm(spaceXSearch)
          setSubmitting(false);
        }}
      >

        {({
          handleSubmit,
        }) => (

          <Form onSubmit={handleSubmit}>
            <label htmlFor="spaceXSearch"> Search: </label>
            <Field type="text" id="spaceXSearch" name="spaceXSearch" />
            <ErrorMessage name="spaceXSearch" component="div" />
          
            <button type="submit"> Submit </button>
          </Form>
        )}
     </Formik>

     { spaceXSearchTerm && <SpaceXLaunches spaceXSearchTerm={ spaceXSearchTerm } /> }
    </div>
  );
}

export default App;
