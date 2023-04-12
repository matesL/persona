import { useRoutes } from 'react-router-dom'
import ImageUploader from '../pages/ImageUploader'
import PDFview from '../pages/PDFview'

const routers = [
    {
        path:'/', 
        element:<ImageUploader/>  
    },  
    {
        path:'/ImageUploader',
        element:<ImageUploader/>
    },
    {
        path: '/PDFview',
        element:<PDFview />
        
    },
]


 const NewRouter = () => {
    const useRouters = useRoutes(routers)
    return useRouters
}

export default NewRouter