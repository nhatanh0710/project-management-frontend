'use client';

import {
  Card,
  Col,
  Row,
  Statistic,
  Button,
} from 'antd';

import {
  ProjectOutlined,
  TeamOutlined,
  FileOutlined,
  RocketOutlined,
} from '@ant-design/icons';

import { getUser } from '@/utils/auth';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      {/* Welcome */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 12,
        }}
      >
        <h1
          style={{
            marginBottom: 8,
          }}
        >
          👋 Chào mừng, {user?.name}
        </h1>

        <p
          style={{
            color: '#666',
            fontSize: 16,
          }}
        >
          Quản lý dự án, theo dõi tiến độ,
          tài liệu và thành viên trong hệ thống
          một cách hiệu quả.
        </p>

        <Button
          type="primary"
          icon={<RocketOutlined />}
        >
          Bắt đầu làm việc
        </Button>
      </Card>


      {/* Statistics */}
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 24,
        }}
      >
        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Dự án"
              value={12}
              prefix={<ProjectOutlined />}
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Thành viên"
              value={35}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Tài liệu"
              value={86}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Tiến độ trung bình"
              value={78}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>


      {/* System info */}
      <Row gutter={16}>
        <Col
          xs={24}
          lg={14}
        >
          <Card
            title="📌 Tổng quan hệ thống"
            style={{
              height: '100%',
              borderRadius: 12,
            }}
          >
            <p>
              Hệ thống quản lý dự án hỗ trợ
              theo dõi công việc, quản lý thành
              viên, lưu trữ tài liệu và kiểm soát
              tiến độ dự án.
            </p>

            <p>
              Bạn có thể tạo workspace,
              quản lý dự án và cộng tác với
              các thành viên trong cùng một
              môi trường làm việc.
            </p>
          </Card>
        </Col>


        <Col
          xs={24}
          lg={10}
        >
          <Card
            title="⚡ Truy cập nhanh"
            style={{
              borderRadius: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <Button>
                Xem workspace
              </Button>

              <Button>
                Tạo dự án mới
              </Button>

              <Button>
                Quản lý thành viên
              </Button>

              <Button>
                Xem tài liệu
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}