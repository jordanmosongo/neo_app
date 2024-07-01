import React from 'react';
import {ProgrammeMajournee} from './ProgrammeMaJournee';

export const MaJourneeList = ({programs}) => {
  return (
    <>
      {programs.map(programme => {
        return (
          <ProgrammeMajournee
            key={programme.id}
            id={programme.id}
            image={programme.image}
            titre1={programme.titre1}
            titre2={programme.titre2}
            description={programme.description}
            color={programme.color}
            time={programme.time}
            location={programme.location}
            theme={programme.theme}
          />
        );
      })}
    </>
  );
};
