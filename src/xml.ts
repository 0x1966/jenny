import {DOMParser, XMLSerializer} from '@xmldom/xmldom'

const MIME_TYPE__TEXT_XML = 'text/xml'

export class Xml {
  static of(source: string | Document): Xml {
    return new Xml(source)
  }

  private serializer: XMLSerializer
  private document: Document

  private constructor(source: string | Document) {
    this.serializer = new XMLSerializer()
    this.document = typeof source === 'string' ? parseFromString(source) : source
  }

  get(): Document {
    return this.document
  }

  getAsString(): string {
    return this.serializer.serializeToString(this.document)
  }

  withTextElementAdded(parentTagName: string, tagName: string, value: string): Xml {
    const element = this.elementWithTextNode(tagName, value)
    const parents = this.document.getElementsByTagName(parentTagName)
    if (parents.length > 0) {
      parents[0].appendChild(element)
    }
    return this
  }

  withTextValueSet(tagName: string, value: string): Xml {
    const textNode = this.document.createTextNode(value)
    const elements = this.document.getElementsByTagName(tagName)
    if (elements && elements.length > 0) {
      while (elements[0].hasChildNodes()) {
        elements[0].removeChild(elements[0].childNodes[0])
      }
      elements[0].appendChild(textNode)
    }
    return this
  }

  private elementWithTextNode(tagName: string, value: string): HTMLElement {
    const element = this.document.createElement(tagName)
    const textNode = this.document.createTextNode(value)
    element.appendChild(textNode)
    return element
  }
}

function parseFromString(source: string): Document {
  return new DOMParser().parseFromString(source, MIME_TYPE__TEXT_XML)
}
