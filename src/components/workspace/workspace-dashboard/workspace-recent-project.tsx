// 'use client';

// import Link from 'next/link';

// import dayjs from 'dayjs';

// import {
//   Card,
//   Empty,
//   Tag,
// } from 'antd';

// import {
//   CalendarOutlined,
// } from '@ant-design/icons';

// import { useParams } from 'next/navigation';

// import { useProjectList } from '@/contexts/project-list.context';

// import styles from './styles.module.scss';

// export default function UpcomingDeadlines() {
//   const { workspaceId } = useParams();

//   const { projects } = useProjectList();

//   const deadlineProjects = [...projects]
//     .filter(
//       (project) =>
//         !!project.deadline,
//     )
//     .sort(
//       (a, b) =>
//         new Date(
//           a.deadline!,
//         ).getTime() -
//         new Date(
//           b.deadline!,
//         ).getTime(),
//     )
//     .slice(0, 5);

//   const renderDeadline = (
//     deadline: string,
//   ) => {
//     const today =
//       dayjs().startOf('day');

//     const target =
//       dayjs(deadline).startOf(
//         'day',
//       );

//     const diff =
//       target.diff(today, 'day');

//     if (diff < 0) {
//       return (
//         <Tag color="red">
//           Overdue{' '}
//           {Math.abs(diff)} day
//           {Math.abs(diff) > 1
//             ? 's'
//             : ''}
//         </Tag>
//       );
//     }

//     if (diff === 0) {
//       return (
//         <Tag color="volcano">
//           Today
//         </Tag>
//       );
//     }

//     if (diff === 1) {
//       return (
//         <Tag color="orange">
//           Tomorrow
//         </Tag>
//       );
//     }

//     return (
//       <Tag color="blue">
//         {diff} days left
//       </Tag>
//     );
//   };

//   return (
//     <Card
//       className={styles.card}
//       title={
//         <div
//           className={
//             styles.title
//           }
//         >
//           <CalendarOutlined />

//           <span>
//             Upcoming Deadlines
//           </span>
//         </div>
//       }
//     >
//       {!deadlineProjects.length ? (
//         <Empty description="No deadline" />
//       ) : (
//         <div className={styles.list}>
//           {deadlineProjects.map(
//             (project) => (
//               <Link
//                 key={project._id}
//                 href={`/user/workspace/${workspaceId}/project/${project._id}`}
//                 className={
//                   styles.item
//                 }
//               >
//                 <div
//                   className={
//                     styles.header
//                   }
//                 >
//                   <span
//                     className={
//                       styles.name
//                     }
//                   >
//                     {
//                       project.name
//                     }
//                   </span>

//                   {renderDeadline(
//                     project.deadline!,
//                   )}
//                 </div>

//                 <div
//                   className={
//                     styles.date
//                   }
//                 >
//                   {dayjs(
//                     project.deadline,
//                   ).format(
//                     'DD/MM/YYYY',
//                   )}
//                 </div>
//               </Link>
//             ),
//           )}
//         </div>
//       )}
//     </Card>
//   );
// }