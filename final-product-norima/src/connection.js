import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://qozmqittxsygambaedan.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvem1xaXR0eHN5Z2FtYmFlZGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODI0NDIsImV4cCI6MjA2NTI1ODQ0Mn0.sms7ozCZ7LQzaqD5DfXNRm_wdZDAtaz5aP5JMBxuvSE'

export const supabase = createClient(supabaseUrl, supabaseKey)