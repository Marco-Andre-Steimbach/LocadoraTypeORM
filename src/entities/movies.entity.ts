import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('movies')
class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 50, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true }) 
    description: string | null; 

    @Column({ type: 'integer', nullable: false })
    duration: number;

    @Column({ type: 'integer', nullable: false })
    price: number;
}

export default Movie;
