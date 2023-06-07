import { useHistory } from 'react-router-dom';
import './PageNotFound.scss';
import { RiErrorWarningLine } from 'react-icons/ri';

const PageNotFound = () => {

    const history = useHistory();

    const backToHomepage = () => {
        history.push('/');
        window.location.reload();
    }

    return (
        <div className="page-not-found">
            <div className='container'>
                <div className='page-content'>
                    <div className='text-center'>
                        <RiErrorWarningLine className='warning-icon'/>
                    </div>
                    <div className='mt-4 d-flex justify-content-center'>
                        <h3>Page Not Found</h3>
                    </div>
                    <div className='mt-4 text-center px-3'>
                        Unfortunately the page you're looking for doesn't exist (anymore) or there was an error in the link you followed or typed
                    </div>
                    <div className='mt-4 d-flex justify-content-center'>
                        <button className='btn btn-primary' onClick={backToHomepage}>&laquo; Go to Homepage</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PageNotFound;