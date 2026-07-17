'use client';

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from 'chart.js';

import {
  Doughnut,
} from 'react-chartjs-2';

import { Card } from 'antd';

import type {
  DashboardProjectSummary,
} from '@/types/dashboard.type';

import styles from './styles.module.scss';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

interface Props {
  summary: DashboardProjectSummary;
}

export default function DashboardProjectSummary({
  summary,
}: Props) {
  const total =
    summary.planning +
    summary.in_progress +
    summary.completed +
    summary.on_hold;

  const chartData = {
    labels: [
      'Planning',
      'In Progress',
      'Completed',
      'On Hold',
    ],
    datasets: [
      {
        data: [
          summary.planning,
          summary.in_progress,
          summary.completed,
          summary.on_hold,
        ],
        borderWidth: 0,
        backgroundColor: [
          '#94A3B8',
          '#F59E0B',
          '#22C55E',
          '#4F46E5',
        ],
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions = {
    cutout: '72%',
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const items = [
    {
      label: 'Planning',
      value: summary.planning,
      color: '#94A3B8',
    },
    {
      label: 'In Progress',
      value: summary.in_progress,
      color: '#F59E0B',
    },
    {
      label: 'Completed',
      value: summary.completed,
      color: '#22C55E',
    },
    {
      label: 'On Hold',
      value: summary.on_hold,
      color: '#4F46E5',
    },
  ];

  return (
    <Card
      title="Project Status"
      className={styles.sectionCard}
    >
      <div className={styles.summaryContainer}>
        <div className={styles.chartWrapper}>
          <Doughnut
            data={chartData}
            options={chartOptions}
          />

          <div className={styles.chartCenter}>
            <div className={styles.chartValue}>
              {total}
            </div>

            <div className={styles.chartLabel}>
              Projects
            </div>
          </div>
        </div>

        <div className={styles.legend}>
          {items.map((item) => (
            <div
              key={item.label}
              className={styles.legendItem}
            >
              <div className={styles.legendLeft}>
                <span
                  className={styles.legendDot}
                  style={{
                    background: item.color,
                  }}
                />

                <span>{item.label}</span>
              </div>

              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}