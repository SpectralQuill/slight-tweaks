import Comparison from "./Comparison";
import NumberUtils from "./NumberUtils";
import Range from "./Range";

export default class FracRange extends Range< frac > {

    private static compare = ( number1: frac, number2: frac ): Comparison => {

        return (
            number1 > number2 ? Comparison.MoreThan
            : number1 < number2 ? Comparison.LessThan
            : Comparison.Equal
        );

    }

    constructor(
        start: frac, end: frac, includeStart: boolean = true, includeEnd: boolean = true,
        private readonly period: frac = 0
    ) {

        super( start, end, FracRange.compare, includeStart, includeEnd );

    }

    public hasInRange( number: number ): boolean {

        const { start, end, period } = this;
        return super.hasInRange( number ) && ( !this.hasPeriod() || NumberUtils.isInteger(
            ( this.isForward() ? ( number - start ) : ( end - number ) ) / period
        ) );
        
    }

    public hasPeriod(): boolean {

        return this.period != 0;
    
    }

    public isBackward(): boolean {

        return !this.isForward();
    
    }
    
    public isForward(): boolean {
    
        return this.period > 0;
    
    }

    public toString(): string {

        const { start, end, includeStart, includeEnd } = this;
        return `${ includeStart ? "[" : "(" }${ start }, ${ end }${ includeEnd ? "]" : ")" }`;

    }

}