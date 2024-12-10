(module
    (import "../time.ts" "getTimeInSeconds" (func $get_time (result i32)))

    (func (export "getValue") (result i32)
        call $get_time)

    (func (export "f") (param i32) (result i32)
        local.get 0
        i32.extend8_s)

    (func $fac (export "fac") (param f64) (result f64)
        local.get 0
        f64.const 1
        f64.lt
        if (result f64)
            f64.const 1
        else
            local.get 0
            local.get 0
            f64.const 1
            f64.sub
            call $fac
            f64.mul
        end)
)
