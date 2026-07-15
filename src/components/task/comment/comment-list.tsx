'use client';

import {
  Empty,
  Pagination,
  Spin,
} from 'antd';

import { useTaskComment } from '@/contexts/task-comment.context';

import CommentEditor from './comment-editor';
import CommentItem from './comment-item';

import styles from './styles.module.scss';

export default function CommentList() {
  const {
    comments,
    loading,

    pagination,

    changePage,
  } = useTaskComment();

  return (
    <div className={styles.commentList}>
      <CommentEditor />

      {loading ? (
        <div className={styles.loading}>
          <Spin />
        </div>
      ) : comments.length === 0 ? (
        <Empty description="No comments yet" />
      ) : (
        <>
          <div className={styles.commentItems}>
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div
              className={
                styles.pagination
              }
            >
              <Pagination
                current={
                  pagination.page
                }
                pageSize={
                  pagination.limit
                }
                total={
                  pagination.total
                }
                showSizeChanger
                showTotal={(total) =>
                  `Total ${total} comments`
                }
                onChange={
                  changePage
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}