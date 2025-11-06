'use client'
import Soundbox from '../Soundbox'

const Favourites = (props) => {

    return (
        <div className='md:px-8 pb-12 px-5'>
            <div className="md:w-[90%] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 my-8 gap-5">
                {props.favoriteSounds && props.favoriteSounds.length > 0 ? props.favoriteSounds.map((sound) => (
                    <Soundbox
                        key={sound.id}
                        id={sound.id}
                        authorId={sound.author}
                        name={sound.name}
                        link={sound.link}
                        tags={sound.tags}
                        color={sound.color}
                        description={sound.description}
                        favorites={sound.favorites}
                        downloads={sound.downloads}
                        category={sound.category}
                        profileFav={true}
                        setRefreshKey={props.setRefreshKey}
                    />
                )) :
                    <div className='w-full flex items-center justify-center'>
                        <p className="text-center text-lg text-gray-500">No favourite sounds yet.</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Favourites
