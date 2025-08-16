import type React from "react";
import styles from "./NavigationGrid.module.scss";
import { Link } from "react-router-dom";

interface NavigationItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    title: "Статистика",
    description: "Покупки, регистрации",
    icon: "📊",
    href: "/admin/stats",
    color: "#4F46E5",
  },

  {
    id: "products",
    title: "Заказы",
    description: "Выдача заказов",
    icon: "📦",
    href: "/admin/orders",
    color: "#DC2626",
  },

  {
    id: "items",
    title: "Предметы",
    description: "Статистика купленных предметов",
    icon: "📦",
    href: "/admin/items",
    color: "#a926dcff",
  },
];

export const NavigationGrid: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Админка</h1>
      </div>

      <div className={styles.grid}>
        {navigationItems.map((item) => (
          <Link to={item.href}>
            <div
              key={item.id}
              className={styles.card}
              style={{ "--accent-color": item.color } as React.CSSProperties}
            >
              <div className={styles.cardIcon}>{item.icon}</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
              <div className={styles.cardArrow}>→</div>
            </div>
          </Link>
        ))}
      </div>

      {/* <div className={styles.quickActions}>
        <h2 className={styles.quickActionsTitle}>Quick Actions</h2>
        <div className={styles.quickActionsList}>
          <button className={styles.quickActionButton}>
            <span className={styles.quickActionIcon}>➕</span>
            Add New Product
          </button>
          <button className={styles.quickActionButton}>
            <span className={styles.quickActionIcon}>👤</span>
            Create User
          </button>
          <button className={styles.quickActionButton}>
            <span className={styles.quickActionIcon}>📊</span>
            Generate Report
          </button>
          <button className={styles.quickActionButton}>
            <span className={styles.quickActionIcon}>🔧</span>
            System Maintenance
          </button>
        </div>
      </div> */}
    </div>
  );
};
