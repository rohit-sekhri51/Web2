import { ShareIcon } from "../icons/ShareIcons";

interface Tags {
    _id: string;
    title: string;
  }
  
interface User {
    _id: string;
    username: string;
  }

interface CardProps {
    link: String;
    type: "youtube" | "twitter";
    title: String;
    tags: Tags[];
    userId: User
}

export function Card({ title, link, type, tags, userId}: CardProps) {
    // Debug logging
//   console.log('Tags received:', tags);
//   console.log('Tags type:', typeof tags);
//   console.log('Tags length:', userId);

    return <div>
        <div className="p-8 bg-white rounded-md shadow-md outline-slate-100 border-gray-100 max-w-72 border 
        min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                    <ShareIcon size="md"/>
                    </div>
                    {title} 
                    {/* {userId.username} */}
                </div>
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                    <a href={link.toString()} target="_blank">
                    <ShareIcon size="md"/>
                    </a>
                    </div>
                    <div className="text-gray-500 pr-2">
                    <ShareIcon size="md"/>
                    </div>
                </div>
            </div>
            {type === "youtube" && 
            <div className="pt-4">
                <iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>  }
            {type === "twitter" &&
            <div className="pt-4">
            <blockquote className="twitter-tweet">
                <a href={link.replace("x.com","twitter.com")}></a>
            </blockquote>
            </div> }
            <div>
                <div>
                Tags# {tags && tags.length > 0 ? (
                    tags.map((x) => ( <span 
                        key={x._id} >
                  {x.title}
                </span>)    )) : (
                    <p>No tags found</p>
                  )}
                </div>
                User# {userId.username}
            </div>
        </div>
    </div>
}