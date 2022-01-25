import {
    useQuery,
    gql
} from "@apollo/client";


interface IProps {
    spaceXSearchTerm: string,
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
    mission_name
    launch_date_local
    rocket {
      rocket_name
    }
  }
}
`;

export function SpaceXLaunches({ spaceXSearchTerm }: IProps) {
   
  const { loading, error, data } = useQuery(LAUNCHES_QUERY, {
      variables: {rocket_name: spaceXSearchTerm},
  });

  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error : {error.message} </p>;

  return (
      <pre>      
          {JSON.stringify(data, null, 2)}
      </pre>
  ); 

  // return data.map(({ mission_name, rocket }: any) => (
  //     // <div key={currency}>
  //     <div>
  //         <p>
  //             {mission_name}: {rocket}
  //         </p>
  //     </div>
  // ));
}