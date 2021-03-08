export enum TableColumnType {
    INCREMENTS
}

type TableColumnBase = {
    name: string;
    isPrimary: boolean;
}

export type TableColumnIncrements = TableColumnBase & {
    type: TableColumnType.INCREMENTS;
}

export type TableColumn = TableColumnIncrements

export type TableColumnBuilder = {
    primary: () => TableColumnBuilder;
}
