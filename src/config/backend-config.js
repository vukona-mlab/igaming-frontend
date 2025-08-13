const environmentType = import.meta.env.VITE_ENVIRONMENT
console.log({ environmentType });

const fetchBackendURL = () => {
    if(environmentType === 'PROD') {
        console.log({ API: import.meta.env.VITE_DEVELOPMENT_API_URL });
        
        return import.meta.env.VITE_DEVELOPMENT_API_URL
    } else {
        console.log({ API: import.meta.env.VITE_API_URL });
        return import.meta.env.VITE_API_URL
    }
}
const BACKEND_URL = fetchBackendURL()
export default BACKEND_URL