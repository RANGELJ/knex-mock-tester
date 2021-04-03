export enum TableColumnType {
    INCREMENTS,
    STRING,
    INTEGER,
}

export type TableColumnBase = {
    name: string;
    primary: boolean;
    notNullable: boolean;
    unique: boolean;
}

export type TableColumnIncrements = TableColumnBase & {
    type: TableColumnType.INCREMENTS;
}

export type TableColumnString = TableColumnBase & {
    type: TableColumnType.STRING;
    length: number;
}

export type TableColumnInteger = TableColumnBase & {
    type: TableColumnType.INTEGER;
    length: number;
}

export type TableColumn =
    TableColumnIncrements
    | TableColumnString
    | TableColumnInteger

export type TableColumnBuilder = {
    primary: () => TableColumnBuilder;
    notNullable: () => TableColumnBuilder;
    unique: () => TableColumnBuilder;
}

export type TableBuilder = {
    increments: (name: string) => TableColumnBuilder;
    string: (name: string, length: number) => TableColumnBuilder;
    integer: (name: string, length: number) => TableColumnBuilder;

    getColumns: () => TableColumn[];
}

export type Table = {
    columns: TableColumn[];
}

export type DbSchema = {
    tables: Record<string, Table>;
    createTable: (name: string, buildFunction: (builder: TableBuilder) => void) => Promise<void>;
}

type TableData = Record<string, unknown>[]

export type DbData = Record<string, TableData>

export type InsertInstruction = (
    data: Record<string, unknown> | Record<string, unknown>[]
) => Promise<unknown[]>;

type GenericQuery = {
    insert: InsertInstruction;
}

export type KnexMock = {
    (tableName: string): GenericQuery;
    dbData: DbData;
    schema: DbSchema;
}
