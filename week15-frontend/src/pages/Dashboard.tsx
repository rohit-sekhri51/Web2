import { useEffect, useState } from 'react'
import { PlusIcon } from '../component/icons/PlusIcons'
import { ShareIcon } from '../component/icons/ShareIcons'
import { Button } from '../component/ui/Button'
import { Card } from '../component/ui/Card'
import { ContentModal } from '../component/ui/ContentModal'
import { SideBar } from '../component/ui/SideBar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  // use Recoil, tanstack, react query
  // use recoil to autoclose the Modal upon submit
  const { contents, reFresh } = useContent();

  useEffect(() => {
    reFresh();
  },[modalOpen])

  async function sendBrain() {
    
      const resp = await axios.post("http://localhost:3000/api/v1/brain/share",{
        share: true
      }, {
        headers: { Authorization: localStorage.getItem('jwt') }
      });
      
      const shareUrl = `http://localhost:3000/api/v1/brain/${resp.data.message}`;
  
      alert("Share Brain URL is: " + shareUrl);

      await navigator.clipboard.writeText(shareUrl);
  }

  return ( <>
    <div>
    <SideBar/>
    </div>
    <div className='p-4 ml-32 min-h-screen bg-gray-100 border-2'>
      <ContentModal isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
      <div className='flex justify-end gap-4'>
      <Button startIcon={<PlusIcon size={"md"} />} variant="primary" size="md" text="Add Content" onClick={() => {setModalOpen(true)}}></Button>
      <Button startIcon={<ShareIcon size={"md"} />} variant="secondary" size="md" text="Share Brain" onClick={sendBrain}></Button>
      </div>
      
      <div className='flex gap-4 flex-wrap'>
        {/* {JSON.stringify(contents)} */}
        {contents.map(({link, type, title, tags, userId}) => 
        <Card link={link} type={type} title={title}
         tags={tags} userId={userId}  /> )}
        
      </div>
    </div>
    </> )
}

