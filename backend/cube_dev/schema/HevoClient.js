cube(`HevoClient`, {
  sql: `SELECT * FROM public.hevo_client`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, city, startDate, date, companyName, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    website: {
      sql: `website`,
      type: `string`
    },
    
    businessDescription: {
      sql: `business_description`,
      type: `string`
    },
    
    ssn: {
      sql: `ssn`,
      type: `string`
    },
    
    address: {
      sql: `address`,
      type: `string`
    },
    
    accounting: {
      sql: `accounting`,
      type: `string`
    },
    
    zip: {
      sql: `zip`,
      type: `string`
    },
    
    city: {
      sql: `city`,
      type: `string`
    },
    
    notes: {
      sql: `notes`,
      type: `string`
    },
    
    startDate: {
      sql: `start_date`,
      type: `string`
    },
    
    closeWeek: {
      sql: `close_week`,
      type: `string`
    },
    
    fiscalYearEnd: {
      sql: `fiscal_year_end`,
      type: `string`
    },
    
    date: {
      sql: `date`,
      type: `string`
    },
    
    state: {
      sql: `state`,
      type: `string`
    },
    
    documentStorage: {
      sql: `document_storage`,
      type: `string`
    },
    
    companyPhone: {
      sql: `company_phone`,
      type: `string`
    },
    
    industry: {
      sql: `industry`,
      type: `string`
    },
    
    businessType: {
      sql: `business_type`,
      type: `string`
    },
    
    ein: {
      sql: `ein`,
      type: `string`
    },
    
    dba: {
      sql: `dba`,
      type: `string`
    },
    
    companyName: {
      sql: `company_name`,
      type: `string`
    },
    
    software: {
      sql: `software`,
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
