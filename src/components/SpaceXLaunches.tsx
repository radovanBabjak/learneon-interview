import {
    useQuery,
    gql
} from "@apollo/client";


interface IProps {
  rocketName: string,
}

interface RocketInventory {
  id: number;
  model: string;
  year: number;
  stock: number;
}

interface RocketInventoryData {
  rocketInventory: RocketInventory[];
}

interface RocketInventoryVars {
  year: number;
}


const LAUNCHES_QUERY = gql`
query GetLaunches($rocket_name: String) {
    launchesPast(find: { rocket_name: $rocket_name }) {
    id
    mission_name
    links {
      mission_patch_small
    }
    rocket {
      rocket_name
    }
    details
  }
}
`;

export function SpaceXLaunches({ rocketName }: IProps) {
   
  const { loading, error, data } = useQuery(LAUNCHES_QUERY, {
      variables: {rocket_name: rocketName},
  });

  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error : {error.message} </p>;

  return (
      <pre>      
          {data.launchesPast.map(({ id, mission_name, rocket, links, details }: any) => {
            return  (
              <div key={ id }>
                <h3>{ mission_name }</h3>
                <img 
                  width="150"
                  height="150"
                  src={ links.mission_patch_small }
                />
                <div>
                  <label> Rocket name: </label>
                  <p>{ rocket.rocket_name }</p>
                </div>

                { details && (
                  <div>
                    <label> Details: </label>
                    <p>{ details }</p>
                  </div>
                )}
              </div>
            );
          })}
      </pre>
  ); 
}