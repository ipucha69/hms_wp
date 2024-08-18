import { PersonAdd, PersonOff, PersonPinSharp } from '@mui/icons-material'
import { Box, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



import { colors } from "../../assets/utils/colors";


const PatientModules = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [pageLoading, setPageLoading] = useState(false);


    useEffect(() => {
        setPageLoading(true);
        setPageLoading(false);
    }, [dispatch]);


    const handleReception = () => {
        navigate("/patients/reception");
    };

    const handleOPD = () => {
        navigate("/patients/opd");
    };

    return (
        <div className="relative">
            {pageLoading ? (
                <div className="py-4 w-full flex justify-center items-center overflow-hidden">
                <div className="absolute bg-white bg-opacity-70 z-10 min-h-screen w-full flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"></div>
                </div>
                </div>
            ) : null}
            <div className="flex flex-row gap-8 justify-center items-center py-4 px-2">
                <Box sx={{ display: 'flex', width: '20%', flexDirection: 'column',"&:hover": {background: `${colors.bgColor6}`,cursor: 'pointer',},}} onClick={() => handleReception()}>
                    <Card variant="outlined" sx={{ borderRadius: 1, backgroundColor: colors.primary, padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                            <Typography variant="body2" gutterBottom sx={{ color: '#fff' }}>
                                Reception
                            </Typography>
                        </Box>
                        <Box sx={{ alignSelf: 'center' }}>
                            <PersonAdd className="mt-2 py-0.5" sx={{ color: '#fff' }}/>
                        </Box>
                    </Card>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', flexDirection: 'column',"&:hover": {background: `${colors.bgColor6}`,cursor: 'pointer',},}}>
                    <Card variant="outlined" sx={{ borderRadius: 1, backgroundColor: colors.primary, padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                            <Typography variant="body2" gutterBottom sx={{ color: '#fff' }}>
                                IPD
                            </Typography>
                        </Box>
                        <Box sx={{ alignSelf: 'center' }}>
                            <PersonPinSharp className="mt-2 py-0.5" sx={{ color: '#fff' }}/>
                        </Box>
                    </Card>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', flexDirection: 'column',"&:hover": {background: `${colors.bgColor6}`,cursor: 'pointer',},}} onClick={() => handleOPD()}>
                    <Card variant="outlined" sx={{ borderRadius: 1, backgroundColor: colors.primary, padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                            <Typography variant="body2" gutterBottom sx={{ color: '#fff' }}>
                                OPD
                            </Typography>
                        </Box>
                        <Box sx={{ alignSelf: 'center' }}>
                            <PersonOff className="mt-2 py-0.5" sx={{ color: '#fff' }}/>
                        </Box>
                    </Card>
                </Box>
            </div>
        </div>
    )
}

export default PatientModules