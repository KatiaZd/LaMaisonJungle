interface BannerProps {
    title: string;
}

const Banner = (props : BannerProps) => {
    const { title } = props;

    return (
        <div>
            <h1>{ title }</h1>
        </div>
    )
}

export default Banner;