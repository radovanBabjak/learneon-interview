import { ReactElement } from 'react';
import {
    useQuery,
    gql
} from "@apollo/client";
import { launches, searchValues } from '../types/types';


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

export function SpaceXLaunches({ spaceXSearch }: searchValues): ReactElement {
   
  const { loading, error, data } = useQuery(LAUNCHES_QUERY, {
      variables: {rocket_name: spaceXSearch},
  });

  if (loading) return <p className="flex flex-col items-center"> Loading... </p>;
  if (error) return <p className="flex flex-col items-center"> Error : {error.message} </p>;
  if (!data?.launchesPast.length) return <p className="flex flex-col items-center"> No results found </p>;

  return (
    <div className="flex flex-wrap" >      
        {data?.launchesPast.map(({ id, mission_name, rocket, links, details }: launches) => {
          return  (
            <div className="box-border lg:w-1/4 md:w-1/2 sm:w-full p-5 text-white" key={ id }>
              <div className="bg-stone-800 h-full p-3 rounded shadow-sm shadow-stone-600">
              <img 
                width="150"
                height="150"
                src={ links.mission_patch_small }
                alt={ mission_name }
                className="mx-auto"
              />
              <div className="flex">
                <label className="text-gray-400"> Rocket name: </label>
                <p>{ rocket.rocket_name }</p>
              </div>

              { details && (
                <div className="flex">
                  <label className="text-gray-400"> Details: </label>
                  <p>{ details }</p>
                </div>
              )}
            </div>
            </div>
          );
        })}
    </div>
  ); 
}