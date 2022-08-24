cube(`HevoUserprofile`, {
  sql: `SELECT * FROM public.hevo_userprofile`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, city, country, jobTitle, fullName, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    zip: {
      sql: `zip`,
      type: `string`
    },
    
    state: {
      sql: `state`,
      type: `string`
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    phone: {
      sql: `phone`,
      type: `string`
    },
    
    slack: {
      sql: `slack`,
      type: `string`
    },
    
    timezone: {
      sql: `timezone`,
      type: `string`
    },
    
    workMode: {
      sql: `work_mode`,
      type: `string`
    },
    
    birthday: {
      sql: `birthday`,
      type: `string`
    },
    
    city: {
      sql: `city`,
      type: `string`
    },
    
    country: {
      sql: `country`,
      type: `string`
    },
    
    address: {
      sql: `address`,
      type: `string`
    },
    
    imageUrl: {
      sql: `image_url`,
      type: `string`
    },
    
    organization: {
      sql: `organization`,
      type: `string`
    },
    
    department: {
      sql: `department`,
      type: `string`
    },
    
    jobTitle: {
      sql: `job_title`,
      type: `string`
    },
    
    email: {
      sql: `email`,
      type: `string`
    },
    
    fullName: {
      sql: `full_name`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    updatedAt: {
      sql: `updated_at`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
