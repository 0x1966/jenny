export declare class Xml {
    static of(source: string | Document): Xml;
    private serializer;
    private document;
    private constructor();
    get(): Document;
    getAsString(): string;
    withTextElementAdded(parentTagName: string, tagName: string, value: string): Xml;
    withTextValueSet(tagName: string, value: string): Xml;
    private elementWithTextNode;
}
//# sourceMappingURL=xml.d.ts.map