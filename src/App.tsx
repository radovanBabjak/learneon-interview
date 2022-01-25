import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup';
import { SpaceXLaunches } from './components/SpaceXLaunches'


function App() {
  const [spaceXSearchTerm, setSpaceXSearchTerm] = useState<string>('');

  return (
    <div>
      <Formik
        initialValues={{ spaceXSearch: '' }}

        validationSchema={ Yup.object({

          spaceXSearch: Yup.string()
            .min(3, 'Must be at least 3 characters long')
            .required('Required')
        })}

        onSubmit={ async (values, { setSubmitting }) => {

          setSpaceXSearchTerm(values.spaceXSearch)
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
