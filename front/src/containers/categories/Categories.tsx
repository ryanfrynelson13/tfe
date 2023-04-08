import CategoryCard from "../../components/category/category-card/CategoryCard"
import { useCategories } from "../../hooks/events/useCategories"
import { Category as CategoryType } from "../../types/categories/category.type"
import classes from './categories.module.css'

const Categories = () => {

    const {categories, isLoading, error} = useCategories()

    const categoriesMap = categories?.map((category: CategoryType) => (
        <CategoryCard key={category.id} {...category}/>
    ))


    return isLoading ? (
        <>
            ...Loading
        </>
    ): categories ? (
        <div className={classes.grid}>
            {categoriesMap}
        </div>
    ) : (
        <>
            {error}
        </>
    )
}

export default Categories