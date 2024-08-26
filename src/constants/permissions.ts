export const moduleRolePermissions = {
  // role base
  super_admin: [
    'manage_pantry_rakes',
    'pantry_rake_mapping',
    'knowledge_base',
    'menu',
    'daily_schedule',
    'dashboard',
    'upcomingBulk',
    'orders',
    'vendors',
    'create_order',
    'pending_outlets',
    'approved_outlets',
    'schedule_future_closure',
    'discounts',
    'reports',
    'payment',
    'master_report',
    'payment_report',
    'refund_report',
    'reverse_orders',
    'cancelled_report',
    'call_centre_report',
    'finance_vendor_rds',
    'finance_irctc_rds',
    'finance_pg_rds',
    'finance_delivery_rds',
    'finance_bill_of_supply',
    'finance_payment_invoices',
    'schedules',
    'finance',
    'feedbacks',
    'delivery_cards_apply',
    'delivery_card',
    'zomato_finance',
    'zomato_north_zone',
    'zomato_west_zone',
    'zomato_south_central_zone',
    'zomato_south_zone',
    'swiggy_finance',
    'swiggy_south_central_zone',
    'swiggy_south_zone',
    'vendors',
    'pending_vendor',
    'announcement_page',
    'promo_campaign',
    'pending_rds',
    'discounts',
    'schedule_future_closure',
    'admin',
    'daily_schedule',
  ],

  admin: [
    'manage_pantry_rakes',
    'pantry_rake_mapping',
    'knowledge_base',
    'menu',
    'daily_schedule',
    'dashboard',
    'upcomingBulk',
    'orders',
    'vendors',
    'pending_vendor',
    'delivery_cards_apply',
    'schedule_future_closure',
    'discounts',
    'approved_outlets',
    'pending_outlets',
    'finance_vendor_rds',
    'finance_irctc_rds',
    'finance_delivery_rds',
    'finance_pg_rds',
    'finance_bill_of_supply',
    'finance_payment_invoices',
    'feedbacks',
    'pending_rds',
    'announcement_page',
    'zomato_north_zone',
    'zomato_west_zone',
    'zomato_south_zone',
    'zomato_south_central_zone',
    'zomato_finance',
    'swiggy_south_zone',
    'swiggy_south_central_zone',
    'swiggy_finance',
    'promo_campaign',
    'reports',
    'admin',
  ],
  ADMIN_CC: [
    'manage_pantry_rakes',
    'pantry_rake_mapping',
    'knowledge_base',
    'menu',
    'daily_schedule',
  ],

  call_center: [
    'upcomingBulk',
    'orders',
    'vendors',
    'feedbacks',
    'knowledge_base',
    'menu',
    'daily_schedule',
  ],
  vendor: [
    'dashboard',
    'orders',
    'vendors',
    'delivery_card',
    'delivery_cards_apply',
    'pending_outlets',
    'approved_outlets',
    'menu',
    'schedules',
    'finance',
    'finance_vendor_rds',
    'feedbacks',
    'knowledge_base',
    'pending_vendor',
    'schedule_future_closure',
    'daily_schedule',
    'discounts',
    'finance_bill_of_supply',
    'finance_payment_invoices',
    'pending_rds',
  ],

  finance: [
    'dashboard',
    'vendors',
    'finance_vendor_rds',
    'finance_pg_rds',
    'knowledge_base',
    'reports',
  ],

  manager: [
    'dashboard',
    'upcomingBulk',
    'orders',
    'vendors',
    'delivery_card',
    'pending_outlets',
    'finance_vendor_rds',
    'finance_irctc_rds',
    'finance_delivery_rds',
    'finance_pg_rds',
    'finance_bill_of_supply',
    'feedbacks',
    'pending_vendor',
    'knowledge_base',
    'promo_campaign',
  ],

  supervisor: [
    'dashboard',
    'upcomingBulk',
    'orders',
    'vendors',
    'delivery_card',
    'pending_outlets',
    'finance_vendor_rds',
    'finance_irctc_rds',
    'finance_delivery_rds',
    'finance_pg_rds',
    'finance_bill_of_supply',
    'feedbacks',
    'pending_vendor',
    'knowledge_base',
    'zomato_north_zone',
    'zomato_west_zone',
    'zomato_south_zone',
    'zomato_south_central_zone',
    'zomato_finance',
    'swiggy_south_zone',
    'swiggy_south_central_zone',
    'swiggy_finance',
    'promo_campaign',
  ],
};

export const downloadReportPermissions = {
  pg_rds: 'PG_RDS_READ',
  bulk_orders: 'BULK_ORDER_DOWNLOAD',
  orders: 'DOWNLOAD_MIS',
  cc_reports: 'CC_CALL_REPORT',
  delivery_rds: 'DELIVERY_RDS_READ',
  pending_delivery_rds: false,
  finance_vendor_rds: 'RDS_READ',
  pending_rds: true,
  irctc_rds: 'RDS_READ',
  feedbacks: true,
  delivery_card: true,
  outlets: true,
  bill_of_supply: true,
  finance_pg_rds: true,
  finance_irctc_rds: true,
  affiliate_rds: 'PG_RDS_READ',
  pending_pg_rds: true,
};

export type DownloadReportPermissions = typeof downloadReportPermissions;
export type DownloadReportPermissionsKeys = keyof DownloadReportPermissions;

export const OutletPermissions = {
  PENDING_OUTLET_READ: 'PENDING_OUTLET_READ',
  PENDING_OUTLET_WRITE: 'PENDING_OUTLET_WRITE',
  PENDING_OUTLET_DOC_UPLOAD: 'PENDING_OUTLET_DOC_UPLOAD',
  PENDING_OUTLET_SUPERVISOR_STATUS_UPDATE:
    'PENDING_OUTLET_SUPERVISOR_STATUS_UPDATE',
  PENDING_OUTLET_MANAGER_STATUS_UPDATE: 'PENDING_OUTLET_MANAGER_STATUS_UPDATE',
  PENDING_OUTLET_AGM_STATUS_UPDATE: [
    'PENDING_OUTLET_AGM_STATUS_UPDATE',
    'PENDING_OUTLET_ZONE_STATUS_UPDATE',
    'PENDING_OUTLET_STATUS_UPDATE',
  ],
};

export const writePermissions = {
  orders: 'ORDER_CREATE',
  feedbacks: 'FEEDBACK_CREATE',
  vendors: 'VENDOR_CREATE',
  rds: 'RDS_CREATE',
  stations: 'STATION_CREATE',
  outlet: 'OUTLET_CREATE',
  pg_rds: 'PG_RDS_CREATE',
  delivery_rds: 'DELIVERY_RDS_CREATE',
  special_orders: 'SPECIAL_ORDER_CREATE',
  delivery_icard: 'DELIVERY_ICARD_CREATE',
  vendor_order: 'VENDOR_ORDER_CREATE',
};

export const updatePermissions = {
  orders_status: 'ORDER_UPDATE_STATUS',
  vendor_update: 'VENDOR_UPDATE',
};

export const readPermissions = {
  outlet_selector: true,
};

export type WritePermissions = typeof writePermissions;
export type WritePermissionsKeys = keyof WritePermissions;

export type UpdatePermissions = typeof updatePermissions;
export type UpdatePermissionsKeys = keyof UpdatePermissions;

export type ReadPermissions = typeof readPermissions;
export type ReadPermissionsKeys = keyof ReadPermissions;
