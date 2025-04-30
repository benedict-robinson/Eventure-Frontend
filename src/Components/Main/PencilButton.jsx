import {PencilIcon} from '@heroicons/react/24/outline'

export default function PencilButton({editFunc}) {
  return (
    <button onClick={editFunc}>
    <div>
        <PencilIcon style={{ width: '24px', height: '22px'}}/>
    </div>
    </button>
  )
}
