import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup';

const LAUNCHES_QUERY = (rocketName: string) => `
{
  launchesPast(find: {rocket_name: "${ rocketName }"}) {
    mission_name
    launch_date_local
    rocket {
      rocket_name
    }
  }
}
`

function App() {
  const [launches, setLaunches] = useState({});

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

          await fetch('https://api.spacex.land/graphql/', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ 
              query: LAUNCHES_QUERY(values.spaceXSearch) 
            })
          }).then(response => response.json())
          .then(responseJson => setLaunches(responseJson.data));

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

     {JSON.stringify(launches, null, 2)}
    </div>
  );
}

export default App;
