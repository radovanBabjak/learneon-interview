import {
    useQuery,
    gql
} from "@apollo/client";


interface IProps {
    spaceXSearchTerm: string,
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
}