# PHP Crash

A social gambling game made with Laravel, Reverb and EloquentORM.
[!score](demo.png)

## Getting Started
```bash
git clone https://github.com/kevinroleke/phpcrash.git
cd phpcrash

composer install
composer dev
php artisan reverb:start
php artisan migrate

# Start the first game
php artisan app:manual-start-game

# Register an account at http://localhost:8080
php artisan app:manual-deposit <user_id> <amount>

# Place a bet then check your balance
php artisan app:get-balance <user_id>
```

## TODO
- [ ] Provably fair hash to replace rand()
- [ ] Exponential time scale for the multiplier increment
- [ ] Display updated user balance
