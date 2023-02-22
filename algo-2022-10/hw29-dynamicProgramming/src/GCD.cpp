#include <stdio.h>
#include <iostream>

int GCD(int a, int b);

int main(void) {
    printf("\n================ CPP-GCD ================\n");
    std::cout << "GCD(1, 1) = " << GCD(1, 1) << std::endl;
    std::cout << "GCD(10, 10) = " << GCD(10, 10) << std::endl;
    std::cout << "GCD(12, 6) = " << GCD(12, 6) << std::endl;
    std::cout << "GCD(36, 42) = " << GCD(36, 42) << std::endl;
    std::cout << "GCD(75, 35) = " << GCD(75, 35) << std::endl;

    return 0;
}

int GCD(int a, int b) {
    if (a == b) {
        return a;
    }

    if (a > b) {
        return GCD(a - b, b);
    } else {
        return GCD(a, b - a);
    }
};
