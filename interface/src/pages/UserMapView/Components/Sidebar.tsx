import './Sidebar.css';
import { Checkbox } from 'react-input-checkbox';


function Sidebar({
    showRegularClinics,
    showEmergencyClinics,
    setShowRegularClinics,
    setShowEmergencyClinics
} : {
    showRegularClinics: boolean,
    showEmergencyClinics: boolean,
    setShowRegularClinics: React.Dispatch<React.SetStateAction<boolean>>,
    setShowEmergencyClinics: React.Dispatch<React.SetStateAction<boolean>>
}
 ){

    return (
        <div className="sidebar_container">
            <div className="checkbox_container">
                <Checkbox
                    disabled={false}
                    value={showRegularClinics}
                    onChange={() => {
                        setShowRegularClinics(!showRegularClinics)
                    }}>
                        Show clinics offer regular service
                </Checkbox>
            </div>

            <div className="checkbox_container">
                <Checkbox
                    disabled={false}
                    value={showEmergencyClinics}
                    onChange={() => {
                        setShowEmergencyClinics(!showEmergencyClinics)
                    }}>
                        Show clinics offer emergency service
                </Checkbox>
            </div>
        </div>

    ); 
};

export default Sidebar;