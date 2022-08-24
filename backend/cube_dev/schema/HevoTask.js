cube(`HevoTask`, {
  sql: `SELECT * FROM public.hevo_task`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [isNewTaskCreated, id, title, createdAt, updatedAt, startDate, extendedDate, dueDate]
    }
  },
  
  dimensions: {
    isTentative: {
      sql: `is_tentative`,
      type: `string`
    },
    
    isNewTaskCreated: {
      sql: `is_new_task_created`,
      type: `string`
    },
    
    isApprovalRequired: {
      sql: `is_approval_required`,
      type: `string`
    },
    
    isBillable: {
      sql: `is_billable`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    notes: {
      sql: `notes`,
      type: `string`
    },
    
    description: {
      sql: `description`,
      type: `string`
    },
    
    repeatType: {
      sql: `repeat_type`,
      type: `string`
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    consumedTime: {
      sql: `consumed_time`,
      type: `string`
    },
    
    title: {
      sql: `title`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    updatedAt: {
      sql: `updated_at`,
      type: `time`
    },
    
    startDate: {
      sql: `start_date`,
      type: `time`
    },
    
    extendedDate: {
      sql: `extended_date`,
      type: `time`
    },
    
    dueDate: {
      sql: `due_date`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
