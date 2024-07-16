import React from 'react';
import { BarLoader } from 'react-spinners'

export const Spinner = ({ width }) => {
    return (
        <div className={'spinnerStyle'}>
            <BarLoader
                color={'#F3A83B'}
                loading={ true }
                width={40 || width}
            />
        </div>
    );
};