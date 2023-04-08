import { useNavigate } from "react-router-dom";
import { Category as CategoryType } from "../../../types/categories/category.type";
import classes from './category.module.css'

const CategoryCard = ({id, category, imageUrl}:CategoryType) => {

    const navigate = useNavigate()
    return(
        <div className={classes.card} onClick={() => navigate('' + id)}>
            <div className={classes.title}>
                <h3>{category}</h3>
            </div>
            <div className={classes.image}>
                <img src={imageUrl} alt="category" />
            </div>
        </div>
    )
}

export default CategoryCard