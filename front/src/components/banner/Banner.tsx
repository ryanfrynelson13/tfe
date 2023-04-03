import classes from './banner.module.css'

type BannerProps = {
    imageUrl: string
    title: string
}

const Banner = ({imageUrl, title}: BannerProps) => {

    return (
        <div className={classes.banner} style={{
            backgroundImage: `url(${imageUrl})`
        }}>
            <h1>{title}</h1>
        </div>
    )
}

export default Banner