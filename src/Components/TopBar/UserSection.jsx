import { UserIcon } from '@heroicons/react/24/outline'

export default function UserSection() {
    return (
      <div className="user-section">
        <div className="user-icon">
          <UserIcon />
        </div>
        <div className="user-email">
          <span className="email-text">user@example.com</span>
        </div>
      </div>
    );
  }
  
