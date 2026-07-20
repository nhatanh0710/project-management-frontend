import { Alert } from 'antd';

export default function ArchivedBanner() {
  return (
    <Alert
      type="warning"
      showIcon
      message="Project Archived"
      description="This project is archived. You can still view information but cannot modify anything."
    />
  );
}