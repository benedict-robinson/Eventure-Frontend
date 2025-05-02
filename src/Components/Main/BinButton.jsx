import {TrashIcon} from '@heroicons/react/24/outline'

export default function BinButton({deleteFunc}) {
  return (
    <button onClick={deleteFunc}>
    <div>
        <TrashIcon style={{ width: '24px', height: '22px'}}/>
    </div>
    </button>
  )
}
