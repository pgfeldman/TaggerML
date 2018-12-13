import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test')
export class Test extends BaseEntity {

  @PrimaryGeneratedColumn('increment', {
    type: 'integer',
  })
  id: string;

}
