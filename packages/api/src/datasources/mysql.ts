import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Connection } from 'typeorm';
import { ApolloContext } from '../startServer';

export interface MySQLAPIProps {
  db: Connection;
}
export default class MySQLAPI extends DataSource<ApolloContext> {
  private db: Connection;
  private context: ApolloContext;

  constructor({ db }: MySQLAPIProps) {
    super();
    this.db = db;
  }

  initialize(config: DataSourceConfig<ApolloContext>) {
    this.context = config.context;
    console.log('mysql init config', Object.keys(this.context), this.db.isConnected);
  }

  // findOrCreate() {
    
  // }
}
