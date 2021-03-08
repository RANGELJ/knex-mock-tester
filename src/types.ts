export enum TableColumnType {
    INCREMENTS
}

type TableColumnBase = {
    name: string;
    primary: boolean;
    notNullable: boolean;
    unique: boolean;
}

export type TableColumnIncrements = TableColumnBase & {
    type: TableColumnType.INCREMENTS;
}

export type TableColumn = TableColumnIncrements

export type TableColumnBuilder = {
    primary: () => TableColumnBuilder;
    notNullable: () => TableColumnBuilder;
}
