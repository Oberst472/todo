<template>
    <div class="ui-loading">
        <span></span>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
        .ui-loading {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: rgba($color--base, 1);
            pointer-events: none;

            span {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 60px;
                border: 2px solid transparent;
                border-top-color: currentColor;
                border-bottom-color: currentColor;
                border-radius: 50%;
                animation: spin 1.5s linear infinite;
                pointer-events: none;

                &:before {
                    content: '';
                    display: block;
                    width: 10px;
                    height: 10px;
                    border: 2px solid currentColor;
                    border-radius: 50%;
                    animation: pulse 1s alternate ease-in-out infinite;
                }
            }
        }

</style>
