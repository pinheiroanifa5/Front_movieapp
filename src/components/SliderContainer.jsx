import React from 'react';
import styled from 'styled-components';
import MovieSlider from './MovieSlider';

const SliderContainer = ({ movies }) => {
    const chunkSize = 10;
    const chunks = [];


    for (let i = 0; i < movies.length; i += chunkSize) {
        chunks.push(movies.slice(i, i + chunkSize));
    }

    return (
        <SliderWrapper>
            {chunks.map((chunk, index) => (
                <MovieSlider key={index} data={chunk} title={`Movies`} />
            ))}
        </SliderWrapper>
    );
};

const SliderWrapper = styled.div`
  padding: 2rem;
`;

export default SliderContainer;
