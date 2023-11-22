
import './styles.css'

function PageContainer({ children }) {
    
    return (
    <div className="page">
        <div className="page-container">
            {children}
        </div>
    </div>
    )

}

export default PageContainer;