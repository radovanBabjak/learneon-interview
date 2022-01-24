import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup';

function App() {

  return (
    <div>
      <Formik
        initialValues={{ spaceXSearch: '' }}

        validationSchema={ Yup.object({

          spaceXSearch: Yup.string()
            .min(3, 'Must be at least 3 characters long')
            .required('Required')
        })}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >

        {({
          handleSubmit,
        }) => (

          <Form onSubmit={handleSubmit}>
            <label htmlFor="spaceXSearch"> Search: </label>
            <Field type="text" id="spaceXSearch" name="spaceXSearch" />
            <ErrorMessage name="spaceXSearch" component="div" />
          
            <button type="submit">Submit</button>
          </Form>
        )}
     </Formik>
    </div>
  );
}

export default App;
