import ErrorMessage from "../errorMeassge/errorMessage"
import {Link} from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p>Вы попали на ссылку, которой не существует</p>
            <Link to="/">Вернуться назад</Link>
        </div>
    )
}

export default Page404;