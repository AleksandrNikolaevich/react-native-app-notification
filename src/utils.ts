export function useDefaultProps<P extends object, DP extends Partial<P>>(
    props: P,
    defaultProps: DP
  ): DP & P {
    return {
      ...defaultProps,
      ...props
    };
  }